import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeList from './componets/EmployeeList';
import SearchBar from './componets/SearchBar';
import SearchInfo from './componets/SearchInfo';
import './App.css';

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('https://mocki.io/v1/f0808998-10fe-4474-9499-d9b96d9ce716')
            .then(response => {
                const fetchedEmployees = response.data.map(employee => ({
                    name: employee.Name || '',
                    position: employee.Position || '',
                    office: employee.Office || '',
                    age: employee.Age || '',
                    startDate: employee['Start Date'] || '',
                    salary: employee.Salary || '',
                }));
                setEmployees(fetchedEmployees);
                setFilteredEmployees(fetchedEmployees);
            })
            .catch(error => console.error('Error fetching employee data:', error));
    }, []);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm.length < 3) {
            setFilteredEmployees(employees);
        } else {
            const filtered = employees.filter(employee =>
                (employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (employee.position && employee.position.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredEmployees(filtered);
        }
    };

    return (
        <div className="App">
            <div className="header">
                <h1>Employee Tracker</h1>
                <div className="input-container">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <EmployeeList employees={filteredEmployees} />
            </div>
            
        </div>
    );
};

export default App;
