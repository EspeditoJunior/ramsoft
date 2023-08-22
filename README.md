
# Ramsoft assessment

This assessment was divided in two different project, a backend project in .Net(C#) and a frontend in React. I will go in detail in this documentation on the contents of theses projects and what improvements could be made to them.

# Backend Project

The backend project follows a pattern of controllers, services and repositories. The services and repositories implement interfaces, that way, they are easy to test. There are tree main controllers: TaskController, DashboardController and ColumnController. The repositories simulate a database connection using a json file. That being said, the code inside the repositories is not performatic for a large amount of data, and it's just a mock to simulate a database.

# Backend Project  - Testes

When you open the solution RamsoftApi.sln on Visual Studio, you will open two projects, the api project, and the test project. The test project tests the use of the ColumnController(unit tests). Due to the time constraint, this was the only controller that was tested, but the same type of test will be duplicated for the other controllers. The ColumnControllerTests.cs shoul be a good example of the type of unit test I usually write.

# Frontend project

The front end project, written using react, showcases different ypes of react tools, such as state, hooks(useEffect), http requests, material ui, lifting the state up, etc... Due to the time constraints, I have focused my efforts in some stories, while others were not completed (attach images, sort taks). Also, like I said my previous interview, I have no experience with Reac unit tests, so there are no tests in this project, but I'm currently studying jest and will implement testes in all my future react projects.

# Other topics

I have used Xunit and npm instead of yarn and NUnit, as i am more used to these tools.
There are other improvements that could be made to this project, that we can discuss in the next interview, especially related to styling and user interface.
