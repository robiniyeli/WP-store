# WP-store
How to get the files on you computer using VSC (Visual Studio Code)
1. Open the VSC terminal
2. type: git clone https://github.com/robiniyeli/WP-store.git
3. Open the folder. You can now start editing!

How to commit changes to the repository
1. Chech in what branch you are working. For now we want to work on the main branch. You can check this using the following command in the terminal: git branch. If main is highlighted green, it should be fine.
2. Check what files are modified/added/removed using the command : git status. Be sure to check if nothing change that you didn't want to change.
3. Use the command: git add *. to add all the files. you can also add separate files by naming them one by one useing the same command (example): git add [NAME FILE.TYPE]
4. Use command: git status. again to check if the items you want are added, they should be in green.
5. Use command: git commit -m '[MESSAGE]'. A message is required, so just say what you changed.
6. Use command: git push origin head. This will push the commit into the branch. 

That's it! Now you can add files yourself!
