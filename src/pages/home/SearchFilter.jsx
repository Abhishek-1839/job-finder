import React, { useState } from 'react';
import styles from './JobSearch.module.css';

function SearchFilter({ onApplyFilter }) {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const availableSkills = ['Frontend', 'CSS', 'JavaScript', 'HTML', 'React', 'WordPress', 'Node.js'];

    const handleSkillAdd = (event) => {
        const skill = event.target.value;
        if (skill && !selectedSkills.includes(skill)) {
            setSelectedSkills([...selectedSkills, skill]);
        }
        // Reset dropdown to default
        event.target.value = '';
    };

    const handleSkillRemove = (skill) => {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    };

    const handleApplyFilter = () => {
        onApplyFilter(searchTerm, selectedSkills);
    };

    return (
        <div className={styles.container}>
            <div className={styles.jobSearchFilter}>
                <input
                    type="text"
                    placeholder="Type any job title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.input}
                />

                <select onChange={handleSkillAdd} className={styles.dropdown}>
                    <option value="">Select a skill</option>
                    {availableSkills.map((skill, index) => (
                        <option key={index} value={skill}>
                            {skill}
                        </option>
                    ))}
                </select>

                <div className={styles.skillsFilter}>
                    {selectedSkills.map((skill, index) => (
                        <span key={index} className={styles.skillChip}>
                            {skill} <button onClick={() => handleSkillRemove(skill)}>X</button>
                        </span>
                    ))}
                </div>

                <button onClick={handleApplyFilter} className={styles.button}>Apply Filter</button>
                <button onClick={() => setSelectedSkills([])} className={`${styles.button}} ${styles.clearButton}`}>Clear</button>
            </div>
        </div>
    );
}

export default SearchFilter;

