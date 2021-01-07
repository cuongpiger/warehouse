from googletrans import Translator

translator = Translator()
flag = False

while not flag:
    try:
        trans_text = translator.translate('We would have used a two-tailed test for our SnoreCull if our alternate hypothesis had been p ≠ 0.9. We would have had to check whether significantly more or significantly fewer than 90% of patients had been cured', src='en', dest='vi')

        flag = True
    except:
        pass



print(trans_text.text)
