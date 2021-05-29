from selenium import webdriver

url = 'http://www.webscrapingfordatascience.com/complexjavascript/'

driver = webdriver.Firefox()
driver.implicitly_wait(10)
driver.get(url)

for quote in driver.find_elements_by_class_name("quote"):
    print(quote.text)
    
print("Press ENTER to QUIT")
driver.quit()