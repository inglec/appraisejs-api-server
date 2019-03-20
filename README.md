# FYP: API Server

The Node.js server runs a MongoDB database which is accessed through [Mongoose](https://npmjs.com/package/mongoose).

## API

### Authorisation

The following header should be supplied to all API requests:

`Authorization: token OAUTH-TOKEN`

### Endpoints

#### Get Test Results

`GET /api/v1/<TODO>`

## Benchmark Definition

The following schema is defined in `benchmark.json`:
``` js
{
  myFirstBenchmark: {
    benchmark: Function, // The benchmark function itself
    timeout: Number, // Milliseconds before abandoning the test [Default = 1000, Max = 20000]
    runs: Number, // Number of times to run the test [Default = 1, Max = 10]
    maxAttempts: Number // Number of times to attempt the runs [Default = 1, Max = 10]
  }
}
```

## MongoDB

Alternative:
``` json
"tests": [
  {
    "testId": "7490uf",
    "ownerId": 123,
    "repositoryId": 13241320,
    "commitId": "1023481-2384",
    "workerId": "worker2",
    "queuedAt": 2349752034,
    "startTime": 12232342398,
    "endTime": 26312364987,
    "globalErrors": [{
      "stage": "verify unique benchmarks",
      "error": "duplicate IDs"
    }],
    "benchmarks": [
      {
        "benchmarkId": "errors-syntax-error",
        "filepath": "src/utils/errors.benchmark.js",
        "error": {
          "error": "syntax error at line 127",
          "stage": "get exports"
        }
      },
      {
        "benchmarkId": "utils-add-numbers",
        "filepath": "src/utils/utils.benchmark.js",
        "lineNumber": 126,
        "benchmarkDefinition": {
          "runs": 3,
          "maxAttempts": 2,
          "timeout": 5000
        },
        "attempts": [{
          "runs": [
            {
              "result": 6,
              "time": 1230192830
            },
            {
              "error": "timed out"
            }
          ]
        }]
      }
    ]
  }
]
```
