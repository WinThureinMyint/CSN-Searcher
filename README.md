# CSN-Seacher
 Front-end side Chrome Extension and Webpage for Scholarly Article Network (CSN) searcher.

## What is CSN-search?
> CSN searcher leverages Siamese RNN architecture proposed by Mueller and Thyagarajan (2016) to provide document search for COVID-19 articles based on section-level similarity. You can provide the section you would like to explore more, and our tool finds research articles contain similar section. The network is built based on dataset generously provided by AI2 on Kaggle.

## Chrome Extension
It will show the search results of selected text on the web page. The selected text will be auto copy to the search box of extension. User can also use the extension to search by typing.
### Extension Permission
- tabs
- activeTab

## Webpage

It's the **responsive** search page for CSN-Search. It will show the max 100 resutls with pagination. The results will contains urls, title and body text. The body text can be expended.

### Libraries
- bootstrap 4.5.2
- popper 1.16.1
- fontawesome
- jquery 3.5.1
- jquery.twbsPagination 1.4.2
