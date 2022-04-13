import { fetchEmployee } from "./getEmployees"

export type Employee = {
    name:string
    jobTitle:string
    boss:string|null
    salary:string
}

export class TreeNode {
    name: string
    boss: string
    descendants: TreeNode[]

    constructor(name:string, boss:string) {
        this.name = name
        this.boss = boss
        this.descendants = []
    }
}

/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */
export function generateCompanyStructure(employeesArr:Employee[]) : TreeNode {
    const root = new TreeNode(employeesArr[0].name, employeesArr[0].boss)
    employeesArr.forEach(employee => {
        if(employee.boss !== null)
            hireEmployee(root,employee,employee.boss)
    });
    return root;
}

/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
export function hireEmployee(tree: TreeNode, newEmployee: Employee, bossName: string) : void {
    let employeeName = newEmployee.name.split('@')[0];
    employeeName = employeeName.charAt(0).toUpperCase() + employeeName.slice(1)
    const bossNode = fetchEmployee(tree,bossName);
    bossNode.node.descendants.push(new TreeNode(employeeName, newEmployee.boss))
    console.log(`[hireEmployee]: Added new employee ${employeeName} with ${bossName} as their boss`)
}

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
export function fireEmployee(tree: TreeNode, name:string) : void {
    const firedEmployeeNode = fetchEmployee(tree,name);
    if(!firedEmployeeNode){
        console.log(`Could not find any employee with the name: ${name}`)
    }
    else{
        const bossNode = fetchEmployee(tree,firedEmployeeNode.node.boss)
        let randomDescendantNode : TreeNode;
    
        if(firedEmployeeNode.node.descendants.length == 0){
            bossNode.node.descendants = bossNode.node.descendants.filter(descendant => descendant.name !== name)
        }
        else{
            // Select random descendant
            randomDescendantNode = firedEmployeeNode.node.descendants[Math.floor(Math.random() * firedEmployeeNode.node.descendants.length)]
            
            // Override firedEmployee with a random descendant
            firedEmployeeNode.node.name = randomDescendantNode.name;
            firedEmployeeNode.node.descendants.push(...randomDescendantNode.descendants)
            
            firedEmployeeNode.node.descendants.forEach(descendant => descendant.boss = randomDescendantNode.name)
            firedEmployeeNode.node.descendants = firedEmployeeNode.node.descendants.filter(descendant => descendant.name !== randomDescendantNode.name)
    
        }
        console.log(`[fireEmployee]: Fired ${name} and replaced with ${randomDescendantNode.name}`);
    }   
}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
export function promoteEmployee(tree: TreeNode, employeeName:string) : void {

    const employeeNode = fetchEmployee(tree,employeeName);
    if(employeeNode.node.boss != null){

        const bossNode = fetchEmployee(tree,employeeNode.node.boss)
    
        employeeNode.node.name = bossNode.node.name
        employeeNode.node.boss = employeeName
        bossNode.node.name = employeeName
    
        bossNode.node.descendants.forEach(descendant => {
            descendant.boss = employeeName
        });

        console.log(`[promoteEmployee]: Promoted ${employeeName} and made ${employeeNode.node.name} his/her subordinate`);        
    }
}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinate and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
export function demoteEmployee(tree: TreeNode, employeeName:string, subordinateName: string) : void {
    const subordinateEmployeeNode = fetchEmployee(tree,subordinateName);
    const subordinateBossEmployeeNode = fetchEmployee(tree,subordinateEmployeeNode.node.boss);
    const demotedEmployeeNode = fetchEmployee(tree,employeeName);

    demotedEmployeeNode.node.name = subordinateName
    demotedEmployeeNode.node.descendants.push(...subordinateEmployeeNode.node.descendants,new TreeNode(employeeName,subordinateName))
    demotedEmployeeNode.node.descendants.forEach(descendant => { descendant.boss = subordinateName });

    subordinateBossEmployeeNode.node.descendants = subordinateBossEmployeeNode.node.descendants.filter(descendant => descendant.name !== subordinateName)

    console.log(`[demotedEmployee]: Demoted employee (demoted ${employeeName} and replaced with ${subordinateName})`);
}
