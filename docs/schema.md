## Database Schema

USERS

| column name     |   type   |        details |
| --------------- | :------: | -------------: |
| \_id            | ObjectId |    not_null/PK |
| name            |  string  |       not_null |
| email           |  string  |       not_null |
| password_digest |  string  |       not_null |
| isBarber        | boolean  | default: false |
| session_token   |  string  |              ? |

IMAGES

| column name |   type   |          details |
| ----------- | :------: | ---------------: |
| \_id        | ObjectId |      not_null/PK |
| title       |  string  | not_null/indexed |
| userId      | ObjectId |      not_nulL/FK |
| url         |  string  |         not_null |

VIDEOS

| column name |   type   |     details |
| ----------- | :------: | ----------: |
| \_id        | ObjectId | not_null/PK |
| title       |  string  |    not_null |
| userId      | ObjectId | not_nulL/FK |
| url         |  string  |    not_null |
