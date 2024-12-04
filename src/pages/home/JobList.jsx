import React from 'react';
import styles from './JobSearch.module.css';

function JobList({ jobs }) {
    return (
        <div className={styles.jobList}>
            {jobs.map((job, index) => (
                <div key={index} className={styles.jobCard}>
                    <div className={styles.jobInfo}>
                        <h3>{job.title}</h3>
                        <p>{job.location} | {job.salary}</p>
                        <div className={styles.tags}>
                            {job.skills.map((skill, idx) => (
                                <span key={idx} className={styles.skillChip}>{skill}</span>
                            ))}
                        </div>
                    </div>
                    <button className={styles.button}>View details</button>
                </div>
            ))}
        </div>
    );
}

export default JobList;
