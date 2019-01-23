# FYP: API Server

The Node.js server runs a MySQL database which is accessed through a [MySQL package](https://www.npmjs.com/package/mysql).

Strings are escaped using an [SQL sanitization package](https://www.npmjs.com/package/sqlstring).

## Database

A MySQL database is used on the server.

### Tables

All tables are normalised in Boyce-Codd Normal form.

#### Functions

Note: This table is probably not necessary.

| repository_id | commit_id | function_id |
| ------------- | --------- | ----------- |
| `string`      | `string`  | `string`    |

#### Results

Note: We might be able to combine the previous table and this one, replacing `job_id`.

| job_id   | test_id  | timestamp | time      |
| -------- | -------- | --------- | --------- |
| `string` | `string` | `integer` | `integer` |

Where:
* `test_id` is a unique ID for the test.
* `timestamp` is the Unix timestamp in milliseconds of when the test was run.
* `time` is the number of milliseconds taken to execute the function.

Primary key: `test_id`

Constraints:
* `time` > 0
* `time` not `null`

The `job_id` field is derived from:
* Repository ID
* Commit ID
* Function ID

## API

### Authorisation

The following header should be supplied to all API requests:

`Authorization: token OAUTH-TOKEN`

### Endpoints

#### Get Test Results

`GET /api/v1/tests/:repository/:commit/:function`
