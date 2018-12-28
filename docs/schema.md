## Database Schema
```JavaScript
UserSchema: {
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  age: Integer,
  image: String,
  phone: String,
  address: String,
  date: Date
}

EventSchema: {
  _id: ObjectId,
  organizer: [User(s)],
  title: String,
  date: Date,
  image: String,
  description: String,
  location: String,
  items: [Item(s)]
}

ItemSchema: {
  _id: ObjectId,
  name: String,
  description: String,
  quantity: Integer,
  owner: [User(s)]
}

ImageSchema: {
  _id: ObjectId,
  url: String,
  description: String,
  userId: ObjectId,
  eventId: ObjectId
}
```