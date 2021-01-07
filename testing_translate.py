
""" from googletrans import Translator

translator = Translator(service_urls=['translate.googleapis.com'])
flag = False

# while not flag:
#     try:
#         trans_text = translator.translate('I love you', dest='vi')

#         flag = True
#     except:
#         pass

trans_text = translator.translate('This package can be installed by the following way. It provides translation for major languages.', src='en', dest='vi')

print(trans_text) """




""" from translate import Translator
text = "This package can be installed by the following way. It provides translation for major languages."
translator= Translator(from_lang="english",to_lang="vietnamese")
translation = translator.translate(text)

print(translation) """




from google_trans_new import google_translator  
  
translator = google_translator()  
translate_text = translator.translate('This package can be installed by the following way. It provides translation for major languages.',lang_src='en',lang_tgt='vi')  
print(translate_text)