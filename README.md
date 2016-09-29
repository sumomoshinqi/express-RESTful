# Definitions of Errors #

This is a pretty simple version of error list. e.g. I define the case "ID should not be included" as "Invalid property name ID" where ID is treated as an invalid property name in a Driver object during POST. Also I use "Invalid value in $Resource" when there's type error in the car/passenger/driver object.

Status codes are

- 400 for invalid property names
- 500 for invalid property values. (An error message is received from MongoDB)

Check my code for details. 😊

| Error Code | Error Message                   | Relevant Resources | Parameters          |
| ---------- | ------------------------------- | ------------------ | :------------------ |
| 1001       | Invalid resource name {0} given | All Resources      | `0 - Resource Name` |
| 1002       | Given car does not exist        | `cars`             | None                |
| 1003       | Given driver does not exist     | `drivers`          | None                |
| 1004       | Given passenger does not exist  | `passengers`       | None                |
| 1005       | Invalid property name {0}       | All Resources      | `0 - Property Name` |
| 1006       | Invalid value in {0}            | All Resources      | `0 - Resource Name` |
| 1007       | No car data                     | `cars`             | None                |
| 1008       | No driver data                  | `driver`           | None                |
| 1009       | No passenger data               | `passenger`        | None                |
