# Translator service

The purpose of this service is to provide  on-demand translation, using AWS translate.

This can be used by the client to translate the whole form, or simply a single sentence.

# Run it

It runs on port `6001`, you can manually start it with :

`yarn start`

# Routes

## `/`

### `POST`

Allows to translate a sentence to any language, from any language.
#### Request
|attribute|type|desc|
|-|-|-|
|text|`string`|The text you want to translate|
|targetLanguage|`string`|The language you want to translate your sentence to (lower-case two letters country code)|
|sourceLanguage|`string`|The source language of your text (lower-case two letters country code)|

##### Example :

```JSON
{
  "text":"hello",
  "targetLanguage":"fr",
  "sourceLanguage":"en"
}
```
#### Response

##### Example :

```JSON
{
  "target":"fr",
  "source":"en",
  "translatedText":"bonjour",
  "originalText":"hello"
}
```

|attribute|type|desc|
|-|-|-|
|target|`string`|The language you asked a translation to|
|source|`string`|The source language of your sentence|
|translatedText|`string`|Your translated sentence in the targeted language|
|originalText|`string`|Your original sentence|


## `/form`

### `POST`

Allows to translate the full form of the ID3 web-app to any language, but only from english.

#### Request

|attribute|type|desc|
|-|-|-|
|targetLanguage|`string`|The language you want to translate your sentence to (lower-case two letters country code)|
|questionsAnswers|`Array<FormObject>`|List of questions + answers of your form|


##### `FormObject` type

|attribute|type|desc|
|-|-|-|
|id|`string`|ID of the question|
|question|`string`|Question|
|answers|`Array<string>`|List of the possible answers|

##### Example :
```JSON
{
    "targetLanguage": "fr",
    "questionsAnswers": [
        {
            "id": "outlook",
            "question": "What is the weather like ?",
            "answers": [
                "overcast",
                "sunny",
                "rainy"
            ]
        }
    ]
}
```

#### Response

The response has the same schema as the request.

##### Example : 

```JSON
{
    "targetLanguage": "fr",
    "questionsAnswers": [
        {
            "id": "outlook",
            "question": "Quel est le temps ?",
            "answers": [
                "nuageux",
                "ensoleillé",
                "pluvieux"
            ]
        }
    ]
}
```