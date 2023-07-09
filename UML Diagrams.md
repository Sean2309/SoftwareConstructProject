```mermaid
classDiagram
class NotifController
<<abstract>> NotifController
NotifController"1" --> "*"MessageNotif: Inheritance
NotifController"1" --> "*"EmailNotif: Inheritance
NotifController"1" --> "*"InAppNotif: Inheritance


class NotifController{
    -notif_mode: String
    -TransactionDetails: String
    -getTransactionDetails(): String
    -getUserNotifMode(): String
    -sendNotif(): void
}

class MessageNotif{
    - UserNumber: String
    - sendNotif(): void
}

class EmailNotif{
    -UserEmail: String
    -sendNotif(): void
}

class InAppNotif{
    -sendNotif(): void
    -updateStatus(): void
}
```
```Mermaid

sequenceDiagram
    TransactionEnquiryAPI -->> NotifController: TransactionStatus_Updated == True
    activate NotifController
    NotifController -) NotifController:getTransactionDetails()
    deactivate NotifController
    
    activate NotifController
    NotifController -) NotifController:getUserNotifMode()
    NotifController -) User: sendNotif()
    deactivate NotifController

```
```mermaid
classDiagram
class transactionEnquiryController_TC
transactionEnquiryController_TC"1" -->"*"transactionEnquiryModel


class transactionEnquiryController_TC{
    - transactionSchema: transactionEnquiryModel
    - processRoute()
    - getOutcomeCode()
}

class transactionEnquiryModel{
    - UserNumber: String
    - membershipId: String,
    - membershipName: String,
    - transferDate: String,
    - transferAmount: Number,
    - referenceNumber: String,
    - partnerCode: String,
    - outcomeCode: String
}
```
```Mermaid
classDiagram
class transactionEnquiryController_BA
transactionEnquiryController_BA"1" --> "*"transactionEnquiryModel


class transactionEnquiryController_BA{
    - transactionSchema: transactionEnquiryModel
    - startEnquiry()
    - getReferenceNumbers()
    - makeApiRequest()
    - updateOutcomeCodes()
}

class transactionEnquiryModel{
    - UserNumber: String
    - membershipId: String,
    - membershipName: String,
    - transferDate: String,
    - transferAmount: Number,
    - referenceNumber: String,
    - partnerCode: String,
    - outcomeCode: String
}
```

```Mermaid

sequenceDiagram
    activate Bank-App
    Bank-App -) Bank-App: getReferenceNumbers()
    Bank-App -->> TransferConnect: makeApiRequest()
    deactivate Bank-App
    activate TransferConnect
    TransferConnect -) TransferConnect: processRoute()
    deactivate TransferConnect
    activate TransferConnect
    TransferConnect -) TransferConnect: getOutcomeCode()
    TransferConnect -->> Bank-App: return
    deactivate TransferConnect
    activate Bank-App
    Bank-App -) Bank-App: updateOutcomeCodes()
    deactivate Bank-App
   

