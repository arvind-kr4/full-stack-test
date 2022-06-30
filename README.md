# Skillfield Coding Challenge - Hierarchy Markup

# Problem

Below is employee data of a small company.
It represents the hierarchical relationship among employees. CEO of the company doesn't
have a manager

| Employee Name        | Id   | Manager Id |
| ---------------------|------|------------|
| Allan                | 100  | 150        |
| Martin               | 220  | 100        |
| Jamie                | 150  |            |
| Alex                 | 275  | 100        |   
| Steve                | 400  | 150        |
| David                | 190  | 400        |

Design a suitable representation of this data. Feel free to choose any database (RDBMS, inmemory database etc), file system or even a data structure like List or Map. Then creat a Maven project and write code using any Java style/framework (Spring Boot, Microprofile) that you are most comfortable with. The display should be an organisation hierarchy as below:

| Jamie    |        |         |
|----------|:------:|---------|
|          | Allan  |         |
|          |        | Martin  |
|          |        | Alex    |
|          | Steve  |         |
|          |        | David   |


The result can be simply displayed on the console, or HTML page or even a file; whatever
suits you. Try to cover all the possible scenarios, for example an employee with no manager, a
manager who is not valid employee; etc.
Pay more attention on writing the actual logic of representing the employee tabular data into
the hierarchical format

# Solution
Update the following sections to explain each aspect of your solution. 

### Data Representation 
UPDATE ME: Place here a sample of the data structure that you used to represent the input data.
```
Your data structure here
```

### Traversal Algorithm
UPDATE ME: Explain briefly the algorithim that you used to display the data in an hierarchical manner.
```
Paste your function/s here
```

### Display/Front-end Framework
UPDATE ME: Describe the approach that you used to display the results.

### Test/Build/Running your Project
If someone were to run your application locally, what are the steps that needs to be done (ex. mvn clean package, yarn start) to view the output
```
Step 1: mvn install
Step 2: mvn clean package
.
.
.
```

# Taking the extra mile
These are optional features but it should place you ahead of other candidates if implementated sucessfully

### REST API 
Implement a REST endpoint to GET all employees in your table. This should return a JSON array 
```
{
    results:[
        {id:100,name:"Allan",manager_id:150},
        {id:220,name:"Martin",manager_id:100},
        .
        .
    ]
}
```

### Containerized Deployment (Docker) and Demo Link
UPDATE ME: Containerize your application using Docker and publish it using any free cloud hosting environment of your choice (Netlify, Firebase, Azure, etc.) and add the link to this section.

### Adding unit tests
Add a testing library and include it as part of the build step. A single test case should be enough.

# Criteria
Your work will be evaluated primarily on:

1. Consistency of coding style.
2. Proper error handling.
3. Correct use of Java best practices, including interface/object definitions.
4. Completeness and other value-adds (extra mile)
5. General quality of code and technical communication.

# How to submit your work
1.  Fork this project on bitbucket. You will need to create a free account if you don't have one (https://bitbucket.org/account/signup/).
2.  Update this README.md with all the details about your solution and how to run the project.
3.  When you're finished, send us the URL of your public GIT repository.