from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = 'http://www.webscrapingfordatascience.com/complexjavascript/'
driver = webdriver.Firefox()
driver.get(url)

quote_elements = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located(
        (By.CSS_SELECTOR, ".quote:not(.decode)")
    )
)

for quote in quote_elements:
    print(quote.text)
    
input("Press ENTER to QUIT")
driver.quit()