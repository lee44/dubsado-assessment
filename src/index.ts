import data from './employees.json';
import { getBoss, getSubordinates } from './getEmployees';
import { demoteEmployee, fireEmployee, generateCompanyStructure, hireEmployee, promoteEmployee } from './manageEmployees';

function main() {
    console.log('Normalizing JSON file...')
    console.log('Generating employee tree...')

    const companyTree = generateCompanyStructure(data.employees)
    console.log();
    
    hireEmployee(companyTree,{name:'Jeb',jobTitle:'Specialist',boss:'Sarah',salary:'5000'},'Sarah')
    fireEmployee(companyTree,'Alicia');
    promoteEmployee(companyTree,'Jared')
    demoteEmployee(companyTree,'Xavier', 'Maria')
    getBoss(companyTree,'Bill')
    getSubordinates(companyTree,'Maria')
}

main()
