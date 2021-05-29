from selenium import webdriver

url = "http://www.webscrapingfordatascience.com/complexjavascript/"

driver = webdriver.Firefox()
driver.get(url)

input("Press ENTER to QUIT")
driver.quit()