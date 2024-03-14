# Hotel Sorting (aka: ExpressHot)

The goal of this project was to:
- parse a csv file
- clean up the data
- evaluate hotels
- sort the hotels according to different algorithms
- display sorted hotels and the time it took

There was an optional goal to add an interface using TKinter.

Except we hate TKinter (way too verbose), so we decided to use the Express framework, to code a server in javascript, that we'd use to transmit data from our python script to a web interface.

(Disclaimer: it didn't go that great)

## Parsing

First things first, we didn't use any libraries to parse the csv, as it truly wasn't necessary.

### parse_csv(filepath)


``` python
def parse_csv(filepath):
    parsed = []

    with open(filepath, "r") as f:
        
        keys = f.readline().replace("\n", "").split(",")

        line = f.readline()

        while line != "":
            
            parsed += [get_hotel_info(keys, line)]

            line = f.readline()

    return parsed
```

- <u>parsed:</u> the result of the function.
- <u>keys:</u> the first line of the dataset, we'll use it as the dict's keys.
- <u>line:</u> current line of the csv.

Basically, we open the dataset, read it line by line, then feed the line to the `get_hotel_info()` functions along with the keys.

All of this as long as there are lines to read.

### get_hotel_info(keys, line)

This 

``` python
def get_hotel_info(keys, line):
    string = False

    elements = []
    sub = ""

    for i in line:

        if i == "," and not string:
            elements.append(sub)
            sub = ""
            continue

        if i == '"':
            string = not string
            continue

        if i == "\n": continue

        sub += i

    elements.append(sub)

    hotel = dict(zip(keys, elements))

    return clean_up_hotel(hotel)
```

- <u>string:</u> flag that tells the program whether it needs to interpret commas or not.
- <u>sub:</u> substrings that store each character
- <u>elements:</u> substrings are added to it when commas are found.
- <u>hotel:</u>  the hotel dictionnary that we'll send to `clean_up_hotel()`

Basically here what we do is read character by character, add them to a substring, then if there is a comma and we're not in string mode, add them to the final list of elements.

### clean_up_hotel()

```python
def clean_up_hotel(hotel):
    
    rating = hotel["hotel_rating"]
    experience = hotel["hotel_experience"].lower()

    ratings = {
        "excellent": 4.5,
        "very good": 3.5,
        "average": 2.5,
        "poor": 1.5,
        "terrible": 0.5,
        "bad": 0
    }

    if not rating and not experience:
        rating = 0
        experience = "bad"

    elif not rating and experience:
        rating = ratings[experience]

    elif not experience and rating:
        experience = get_fitting_key(rating, ratings)

    if not hotel["price"]:
        hotel["price"] = 300

    hotel["hotel_rating"] = rating
    hotel["hotel_experience"] = experience

    return hotel
```

This is a basic cleaning functions: if elements don't exists we simply set them to default value, or try to find them according to rating or experience.

- <u>price doesn't exist:</u> set price to 300.
- <u>neither experience nor rating exist:</u> be a karen on yelp and put 0 stars.
- <u>either experience or rating exists:</u> deduce it from the other with `get_fitting_key(rating, ratings)`.

## Sorting algorithms

Here are the three sorting algorithms we used in our project.
We won't detail them much, as they are already described in the course.

The only details to speak off here, is that we passed a keyword argument that is a function to transform objects into numerical values, to establish [key, score] lists.

This allows to sort according to score, then restitute the result in right order using the keys from the original list.

The following code snippet describes how we made the key-score pairs.

```python
def get_key_score_pairs(array, key=None):
    return [[i, key(v)] if key else [i, v] for i, v in enumerate(array)]
```

### Insertion Sort

```python
def insertion_sort(array, key=None, reverse=False):
    
    pairs = get_key_score_pairs(array, key=key)

    for i in range(1, len(pairs)):
        
        if pairs[i][1] < pairs[i - 1][1]:
            
            temp = pairs.pop(i)
        
            j = i - 1
            
            while True:
                
                if j < 0:
                    
                    pairs.insert(0, temp)
                    
                    break
                
                if temp[1] > pairs[j][1]:
                
                    pairs.insert(j + 1, temp)

                    break
                
                j -= 1

    result = [array[i[0]] for i in pairs]
    
    return result[::-1] if reverse else result
```

### Selection Sort

```python
def selection_sort(array, key=None, reverse=False):
    
    pairs = get_key_score_pairs(array, key=key)
    
    for i in range(len(pairs)):
        
        min_ = [i, pairs[i][1]]
        
        for j in range(i, len(pairs)):
              
            min_ = [j, pairs[j][1]] if pairs[j][1] < min_[1] else min_
                
        pairs[i], pairs[min_[0]] = pairs[min_[0]], pairs[i]
    
    result = [array[i[0]] for i in pairs]
```

### Bubble Sort

```python
def bubble_sort(array, key=None, reverse=False):
    
    pairs = get_key_score_pairs(array, key=key)

    i = 0
    changed = False

    # use of while because bubble sort doesn't guarantee the list to be sorted
    # first time so we kinda don't know
    while True:

        # if there is no next value, restart at 0, unless there was no modifications last loop
        # which means that the list is sorted.
        if i + 1 == len(pairs):
            
            if not changed: break
                
            i = 0
            
            changed = False
            
            continue

        # swaps [index, score] pairs if the score of pair i is larger than pair i + 1
        if pairs[i][1] > pairs[i + 1][1]:
            
            pairs[i], pairs[i + 1] = pairs[i + 1], pairs[i]
            
            changed = True

        i += 1
```

## Evaluating

```python
def evaluate(hotel):
    
    price = int(hotel["price"])

    return float(hotel["hotel_rating"]) / 5 * len(hotel["amenities"]) * (1-price/300)
```

This function takes an hotel object in, then makes a global score through multiplication using multiple criterias:

- <u>ratings:</u> we take the rating then divide by 5, so that perfect score is a multiplier of 1. [$rating/5$]
- <u>price:</u> make it so the score is inversely proportional to price. [$1-price/300$]
- <u>amenities:</u> we multiply the score by the number of amenities.

This is not a good implementation as it really highlights amenities. But heh.

*(at time of writing I still don't know if i'll pull an all-nighter trying to create a custom one)*

## Execution Time

```python
def time_func(func, *args, **kwargs):
    
    start = perf_counter()

    result = func(*args, **kwargs)

    end = perf_counter()

    #print(f"[{func.__name__}] executed in {end - start:.2f} seconds")

    obj = {"name": func.__name__ ,"duration": f"{end-start:.2f}", "result": result}

    return obj
```

This function is a wrapper that takes into arguments a function, positional arguments, then keyword arguments. They are then passed to the sorting function.

Before and after execution we use `perf_counter()` to deduce the duration it took to run the code.

## Server Related Stuff

```python
func = {

    "insertionsort": insertion_sort,
    "bubblesort": bubble_sort,
    "selectionsort": selection_sort

}

# CODE RELATED TO THE SERVER
# THIS IS PROBABLY BAD
# BUT I DIDN'T HAVE ANOTHER WAY LMAO

funcname = sys.stdin.read()

result = time_func(func[funcname], data, key=evaluate, reverse=True)

print(json.dumps(result))
```

This piece of code, reads stdin inputs the server sends and acts accordingly.

<style>
    u {
        color:white;
    }
</style>