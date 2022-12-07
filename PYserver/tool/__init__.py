import random
import string

def get_random_string():
    return ''.join(random.sample(string.ascii_letters + string.digits, 8))

