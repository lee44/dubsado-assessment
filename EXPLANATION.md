# Installation

1. Clone this repo: git clone https://github.com/lee44/assessment-1
2. cd assessment-1
3. Run yarn
4. Run yarn start

# Logic/Style Decisions

- Added a Boss Name property to each Tree Node in order to keep track of the boss of each employee
- Created a helper function, fetchEmployee that uses a Breadth First Search Algorithmn and returns the node containing the employee name
- Used hireEmployee function to help generate the tree

# Improvements

- Try to improve the speed of my helper function, fetchEmployee because it has linear time complexity and nearly every function relies on this function
- Create another helper function to swap employees and merge the employee descendents with the former employees descendants so that this function can be used in promoteEmployee and demoteEmployee

# Time Complexities

- generateCompanyStructure: Iterates through all the employees which is O(n). However it also uses hireEmployees which has time complexity of O(|V|), where |V| is the number of nodes. Worst case scenario hireEmployess traverses all nodes making the overall time complexity O(n^2).
- hireEmployee: As stated above O(|V|)
- fireEmployee: The filter, forEach, and fetchEmployee are all O(n) so the overall time complexity is O(n)
- promoteEmployee & demoteEmployee: forEach and fetchEmployee are are both O(n) so the overall time complexity is O(n)
- getBoss, getSubordinates, and getSubordinates: O(n) because of fetchEmployee

# Merging Similar Functions

- promoteEmployee and demoteEmployee because they both involve swapping positions of two employees
