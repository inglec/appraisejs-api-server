# FYP: API Server

The Node.js server runs a MySQL database which is accessed through a [MySQL package](https://www.npmjs.com/package/mysql).

Strings are escaped using an [SQL sanitization package](https://www.npmjs.com/package/sqlstring).

## Database

A MySQL database is used on the server.

### Tables

All tables are normalised in Boyce-Codd Normal form.

#### Tests

Primary key: `repository + commit_id + function_id`

| repository | commit_id | function_id | test_id  |
| ---------- | --------- | ----------- | -------- |
| `string`   | `string`  | `string`    | `string` |

Where:
* `repository` is the name of the repository.
* `commit_id` is the hash of the commit.
* `function_id` is a repository-wide unique string to represent a function.

Constraints:
* `test_id` must be unique.

#### Timings

| test_id  | time     |
| -------- | -------- |
| `string` | `string` |

Where:
* `time` is the number of milliseconds taken to execute the function.

Constraints:
* `time` > 0
* `time` not `null`
