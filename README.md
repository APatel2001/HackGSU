#RecycleMate

## Inspiration
Too often did we find ourselves not knowing whether an item was recyclable. Whether it was of inaccessibility, mislabeling, or pure laziness, our team has experienced ourselves and others simply guessing where an item should go. This sparked our idea to leverage the digital innovations in image capture to clear the doubts and progressively educate others of recyclable materials, thus contributing to a greener future.

## What it does
RecycleMate is a cross-platform mobile application that uses a phone’s camera to capture an object and determine whether it is recyclable. The user is brought to a welcome page which contains navigation to the camera screen. The user can then take a picture of any object they’d like to find out whether it’s recyclable and the app will present two labels issuing what the item is and if it’s recyclable.

## How we built it

We built the app using the react-native mobile application framework which houses the UI and application structure. Google AutoML Vision APIs were used to identify the items captured in an image and assign an identifying label to them. Finally, Using key terms, we query the data for whether the labeled object is appropriate to recycle. 

## Challenges we ran into
There were quite a few struggles during this project that we managed to resolve. Initially, we intended to use Firebase to handle the storage and transfer of images to and from the API, however, this turned out to be very confusing and overly complicated. After some planning and reflection, we realized we didn’t need to implement firebase and instead could send the data to the API directly using POST. Since we all had limited experience with APIs, it was challenging to establish communication between the API and our app. Some members not having any prior experience in react-native or node.js made it difficult to work through building some features of the app.

## Accomplishments that we are proud of
We are proud to have made an application that contributes to the betterment of Earth. This project stemmed from our personal experiences of not promptly knowing whether an item was recyclable and simply making a best guess based on experience. However, as mobile technologies advance and are increasingly available globally, we can offer a definitive answer with the click of a button.

## What we learned
We learned how to integrate Google APIs with a react-native environment. We also learned the basics of react-native to handle our mobile testing. To create a simpler app, we learned that we didn't need to introduce firebase storage and could instead feed the data directly into the API itself. 

## What's next for RecycleMate
An additional component we intend to implement is that following the classification of an item’s recyclability, it should inform the user of various locations where they can safely dispose of the item. For example, if a user were to take a picture of batteries, the app would prompt them to the few closest E-Waste management locations. We have already started this process by creating a function in R which, given a particular item, can identify the appropriate locations to dispose of it, in a particular region. We hope to use Google Maps APIs to build this functionality directly into the app. Another component we intend to implement is the ability for the user to access previous photos and correct labels based on new knowledge or errors made by API so it can learn.
