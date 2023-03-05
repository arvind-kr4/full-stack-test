# Skillfield Coding Challenge - Hierarchy Markup

## Problem
Below is employee data of a small company.
It represents the hierarchical relationship among employees. CEO of the company doesn't
have a manager

 Employee Name        | Id   | Manager Id |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
 -------------------- | ---- | ---------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
 Allan                | 100  | 150        
 Martin               | 220  | 100        
 Jamie                | 150  |            
 Alex                 | 275  | 100           
 Steve                | 400  | 150        
 David                | 190  | 400        

Design a suitable representation of this data. Feel free to choose any database (RDBMS, inmemory database etc), file system or even a data structure like List or Map. 
Then create a project and write code using any programming language that you are most comfortable with. 
The display should be an **organisation hierarchy** as below:

| Jamie    |        |         |      |      |      |      |      |      |      |      |      |      |      |      |
| -------- | ------ | ------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
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

## Your Solution
The following sections will discuss each aspect of your solution. 

### Data Representation 
*UPDATE ME: Place here a sample of the data structure that you used to represent the input data.*

```
I've chosen a `Tree` data structure to represent the data. The implementation of the `Tree` class can be found here `src\server\api\model\tree.ts` and I've also added some unit test along with it following best practices.
```
![alt text](public\Tree.png)

### Traversal Algorithm
*UPDATE ME: Explain briefly the algorithim that you used to display the data in an hierarchical manner.*

I've written a straightforward pre-order traversal function to explore the constructed tree.

```
/**
   * This custom traversal limits the information returned and
   * its response can be shared with client
   * @param node => initial node to traverse from
   * @param level => height of the node in the tree (will used in client)
   * @param acc => standard use of accumulator
   * @returns PreOrderTraversalReturnType[]
   */
  customPreOrderTraversal(
    node = this.root,
    level: number = 0,
    acc: PreOrderTraversalReturnType[] = []
  ): PreOrderTraversalReturnType[] {
    if (!node) {
      return acc;
    }
    acc.push({ name: node.value, level });
    for (let child of node.children) {
      this.customPreOrderTraversal(child, level + 1, acc);
    }
    return acc;
  }
```

### Display/Front-end Framework
*UPDATE ME*: Describe the approach that you used to display the results.*

I've a Next.js frontend with tRPC end to end APIs. The server will share the name and level of the employees (in a particular order) to client and the client will display the information accordingly.

### Test/Build/Running your Project
If someone were to run your application locally, what are the steps that needs to be done (ex. mvn clean package, yarn start) to view the output
```
Assuming the user would have node and npm running in their local.

Step 1: npm install

Since we have the prisma setup with Sqlite db. you'll need to seed the employee information into it.

Step 2: npx prisma db seed

(Run a quick `npx prisma studio` to make sure the data is in place)

Step 3: npm run dev

To test the Tree DS, you can run: `npm run test`

```

## Taking the extra mile
*These are optional features but it should place you ahead of other candidates if implementated sucessfully*

### REST API 
Implement a REST endpoint to **GET all employees** in your dataset. This should return an **array** of employees in **JSON format**.

I've implemented the server REST endpoints using tRPC framework. and you can access the `getALL employees endpoint` using this request:
```
GET request: 
http://localhost:3000/api/trpc/hierarchy.getAll?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22text%22%3A%22from%20tRPC%22%7D%7D%7D

```
The response format will be a bit different since we are using the tRPC framework. 

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

### Error Handling
I've added error handling in tRPC procedures and used the `TRPCError` to rethrow the error with call stack(which is optional).

### Containerized Deployment (Docker) and Demo Link
*UPDATE ME: Containerize your application using **Docker** and publish it using any **free cloud hosting environment of your choice (Netlify, Firebase, Azure, etc.). Add the link to this section.*

### Adding unit tests
Add a testing library and include it as part of the build step. A single test case should be enough.

I've added unit tests to cover the Tree DS, considering thats the core of our application. It can be found here:  `src\server\api\model\tree.test.ts`

## Criteria
Your work will be evaluated primarily on:

1. Consistency of **coding style**.
2. Proper **error handling**.
3. Correct use of Java **best practices**, including interface/object definitions.
4. **Completeness** and other value-adds (extra mile)
5. General **quality of code** and **technical communication**.

## How to submit your work
1.  **Fork** this project on **BitBucket**. You will need to **create a free account** if you don't have one yet (https://bitbucket.org/account/signup/).
2.  Update this README.md with all the details about your solution and how to run the project.
3.  When you're finished, **send us the URL** of your public repository.


## Technologies Used

This project contains the following technologies
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)


## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
