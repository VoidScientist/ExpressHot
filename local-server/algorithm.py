from time import perf_counter
import sys
import json

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

def get_fitting_key(value, dic):
    
    for k in dic:
        
        if float(value) < dic[k]: continue
            
        return k


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


def parse_csv(filepath):
    parsed = []

    with open(filepath, "r") as f:
        
        keys = f.readline().replace("\n", "").split(",")

        line = f.readline()

        while line != "":
            
            parsed += [get_hotel_info(keys, line)]

            line = f.readline()

    return parsed


def evaluate(hotel):
    
    price = int(hotel["price"])

    return float(hotel["hotel_rating"]) / 5 * len(hotel["amenities"]) * (1-price/300)


def get_key_score_pairs(array, key=None):
    
    # establish [key, score] pairs, according to an optional key function.
    
    return [[i, key(v)] if key else [i, v] for i, v in enumerate(array)]


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

    # from the [key, score] pairs, determine the sorted list.
    result = [array[i[0]] for i in pairs]

    return result[::-1] if reverse else result

def selection_sort(array, key=None, reverse=False):
    
    pairs = get_key_score_pairs(array, key=key)
    
    for i in range(len(pairs)):
        
        min_ = [i, pairs[i][1]]
        
        for j in range(i, len(pairs)):
              
            min_ = [j, pairs[j][1]] if pairs[j][1] < min_[1] else min_
                
        pairs[i], pairs[min_[0]] = pairs[min_[0]], pairs[i]
    
    # from the [key, score] pairs, determine the sorted list.
    result = [array[i[0]] for i in pairs]
    
    return result[::-1] if reverse else result

def time_func(func, *args, **kwargs):
    
    start = perf_counter()

    result = func(*args, **kwargs)

    end = perf_counter()

    #print(f"[{func.__name__}] executed in {end - start:.2f} seconds")

    obj = {"name": func.__name__ ,"duration": f"{end-start:.2f}", "result": result}

    return obj

data = parse_csv("hotel_info_dedup.csv")

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