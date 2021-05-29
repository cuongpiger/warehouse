from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class at_least_n_elements_found(object):
    def __init__(self, locator, n):
        self.locator = locator
        self.n = n
        
    def __call__(self, driver):
        elements = driver.find_elements(*self.locator)
        
        if len(elements) >= self.n:
            return elements
        else:
            return False


url = 'http://www.webscrapingfordatascience.com/complexjavascript/'

driver = webdriver.Firefox()
driver.get(url)
driver.implicitly_wait(10)

div_element = driver.find_element_by_class_name('infinite-scroll')
quotes_locator = (By.CSS_SELECTOR, ".quote:not(.decode)")


nr_quotes = 0
while True:
    driver.execute_script(
        arhu
    )