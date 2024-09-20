# Api Routes

Describe api routes. For more details and tests check postman collection (`postman` dir).

## Create Farmer

POST /farmers
body example:

```
{
  "name": "Maximus",
  "farm": {
    "name": "My farm",
    "city": "Cerro Largo",
    "state": "RS",
    "totalArea": 100,
    "arableArea": 60,
    "vegetationArea": 40,
    "crops": ["Soy", "Bean"]
  }
}
```

## Update Farmer

PUT /farmers/:document
body example:

```
{
  "name": "Maximus",
  "document": "092.875.200-38",
  "farm": {
    "name": "My Updated farm",
    "city": "Cerro Largo",
    "state": "RS",
    "totalArea": 110,
    "arableArea": 60,
    "vegetationArea": 40,
    "crops": ["Soy"]
  }
}
```

## Delete Farmer

DELETE /farmers/:document

## Dashboard

GET /dashboard
