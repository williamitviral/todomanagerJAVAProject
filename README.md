todomanagerJAVAProject
======================
This will explain how to use the dynamic JAVA project that is required. You’ll find a zip file containing a project called Todo_Manager that was created to create a dynamic User Interface for Creseti Healthcare.
The primary components of the project are:
•	An index.html file which acts as the main user interface
•	A set of CSS files (bootstrap css is used to enhance the UI experience and a small custom css is created for our own css tweaks)
•	A set of JS files (angular js and angular UI js, Jquery js and our own core angular controller js file)
•	A fonts folder (which is used by bootstrap)
The operation part for an end-user is pretty straight forward. The operations can be divided into:
1.	Add/Create a TODO – To create a TODO, open the index.html file. You’ll see three boxes. In the first box, enter the description of the task. In second, select a date on/by which the task needs to be completed. The third box is a dropdown menu with values “Yes” and “No”. When you’re creating a new task, the only value allowed is “No”, i.e. you cannot create a completed task! After filling all the values, click on “Add”. Your task will be created and will be visible in the list below with a Red background box suggesting the task is still incomplete.
2.	Update a TODO – To update a TODO, open the index.html file. You’ll see a list of tasks already existing in the system. To update any task, click on the “description” part of the task. Clicking on it will fill that task’s values in the boxes above where you can modify the values. After modifying them, click on “Update”. Your task will be updated. If you had modified the completed status of the task from “No” to “Yes”, the task’s background color will be changed to green.
3.	Delete a TODO – To delete a TODO, open the index.html file. You’ll see a list of tasks already existing in the system. To delete any task, click on the “description” part of the task. Clicking on it will fill that task’s values in the boxes above. Also, the “Delete” button that was disabled before will be enabled so that you can delete the task. Click on “Delete” button. Your task will be removed from the list below.
4.	Delete All TODOs – To delete all TODOs, open the index.html file. You’ll see a list of tasks already existing in the system. To delete all tasks, click on the “Delete All” button. All the tasks will be deleted and will be removed from the list below.
5.	Clear – At any point, if you click on a task and then you DO NOT want to update that task but want to create a new task instead, click on Clear. Clear will clear the values in the boxes so that you can go ahead and create a fresh task.

Ceresti todo Java Project
