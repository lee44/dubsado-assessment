import { TreeNode } from "./manageEmployees";

/**
 * Given an employee, will find the node above (if any).
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export function getBoss(tree: TreeNode, employeeName: string) : string {
    const boss = fetchEmployee(tree,employeeName)?.node?.boss

    if(boss)
        console.log(`[getBoss]: ${employeeName}'s boss is ${boss}`)
    else
        console.log(`Cound not find any boss of ${employeeName}`)
    
    return boss;
}

/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
export function getSubordinates(tree: TreeNode, employeeName: string) : TreeNode | {} {
    const employee = fetchEmployee(tree,employeeName)?.node?.descendants;

    if(!employee){
        console.log(`Could not find ${employeeName}`);
        return {};
    }
    else if(employee.length != 0)
        console.log(`[getSubordinate]: ${employeeName}'s subordinates are ${employee.map(descedant => descedant.name)}`)
    else 
        console.log(`${employeeName} has no subordinates`);

    return employee;
}

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export function findLowestEmployee(tree: TreeNode, employeeName: string) : {node : TreeNode, depth : number} | {} {
    const employee = fetchEmployee(tree,employeeName)

    if(!employee){
        console.log(`Couldn't find ${employeeName}`);
        return {};
    }
        
    console.log(`Lowest ranking employee is ${employee.node.name} with a depth of ${employee.depth}`);
    return {node : employee.node, depth : employee.depth};
}

/**
 * Finds and returns the employee node
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export function fetchEmployee(tree: TreeNode, employeeName: string) : {node : TreeNode, depth : number} {
    let depth = 0;
    // create a queue and a variable to store the values of nodes visited  
    let queue = []
    // initiate a node variable to store the current node
    let node : TreeNode;
    // push the root node to the queue   
    queue.push(tree)
    // loop as long as there is anything in the queue
    while(queue.length){
        let size = queue.length
        for(let i = 0; i < size; i++){
            // dequeue a node from the queue 
            node = queue.shift()
                        
            if(node.name.toUpperCase() === employeeName.toUpperCase()) {
                return {node:node,depth:depth};
            }
            queue.push(...node.descendants)          
        }        
        depth++;        
    }
}