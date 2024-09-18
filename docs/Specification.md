# Specification

Requirements to build the system.

## Functional Requirements

### Farmer registration

The system must allow the registration of a Farmer, including information such as document (CPF or CNPJ), farmer's name, farm name, city, state, total area, arable area, vegetation area, and planted crops.

### Farmer edit

The system must allow users to edit the details of an existing farmer.

### Farmer delete

The system must allow users to delete farmer.

### Document validation

The system must validate the formats and validity of the entered CPF and CNPJ.

### Farm area validation

The system must ensure that the sum of the arable area and vegetation area does not exceed the total farm area.

### Multiple crops register

The system must allow the registration of more than one crop per farm (Soybeans, Corn, Cotton, Coffee, Sugarcane).

### Metrics for dashboard

The system must provide an endpoint to display the following information on the Dashboard:

- Total number of farms.
- Total farm area in hectares.
- Pie chart by state.
- Pie chart by crop.
- Pie chart by land use (arable area and vegetation).

## Non-Functional Requirements

### Database

The data must be saved in a Postgres database, ensuring integrity and consistency.

### Language and Runtime

Use of typescript language (superset of JavaScript) and Node.js runtime.

### Performance and Scalability

The system must be capable of handling multiple farm and producer records efficiently, ensuring good performance when retrieving data.

### Code Organization (Best Practices)

The code should follow best practices such as SOLID, KISS (Keep It Simple, Stupid), Clean Code, and the use of API Contracts to define how data will be exchanged between backend and frontend.

### Testing and Layered Architecture

The application should include automated tests and follow a layered architecture, separating responsibilities (service layer, repository, etc.).

### Cloud Availability

Make the system available on a cloud provider, implying that it is configured to run in production with high availability.
