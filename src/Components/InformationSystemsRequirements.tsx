/* eslint-disable no-extra-parens */
import React, { useState } from "react";
//import { Class } from "../interfaces/class";
import { degreePlan } from "../interfaces/degreePlan";

interface ComputerScienceRequirementsProps {
    currentDegreePlan: degreePlan;
}

const ComputerScienceRequirements: React.FC<
    ComputerScienceRequirementsProps
> = ({ currentDegreePlan }) => {
    console.log(currentDegreePlan);
    const [labTrack, setLabTrack] = useState<string>("Chose Your Lab Track");
    const [breadthCredits] = useState<Record<string, number>>({
        TECH: 0,
        ARTS: 0,
        SOCI: 0,
        HIST: 0
    });
    const [degreePlanCourses, setDegreePlanCourses] = useState<string[]>([]);

    currentDegreePlan.semesters.forEach((semester) => {
        semester.classes.forEach((course) => {
            setDegreePlanCourses((prevCourses) => [
                ...prevCourses,
                course.courseCode
            ]);
        });
    });

    const cisCoreRequirements = [
        "CISC108",
        "CISC181",
        "CISC210",
        "CISC220",
        "CISC260"
    ];

    const capstoneRequirements1 = ["CISC498", "CISC499"];
    const capstoneRequirements2 = ["UNIV401", "UNIV402"];

    const universityRequirements = ["ENGL110", "EGG101", "CISC355"];
    const writingOptionRequirements = ["ENGL312", "ENGL410"];

    const biologyLabRequirements = ["BISC207", "BISC208"];
    const chemistryLabRequirements = [
        "CHEM103",
        "CHEM133",
        "CHEM104",
        "CHEM134"
    ];
    const geology1LabRequirements = ["GEOL105", "GEOL115", "GEOL107"];
    const geology2LabRequirements = ["GEOL107", "GEOL110"];
    const physicsLabRequirements = ["PHYS207", "PHYS227", "PHYS208", "PHYS228"];

    const labTrackRequirements: Record<string, string[]> = {
        Biology: biologyLabRequirements,
        Chemistry: chemistryLabRequirements,
        Geology1: geology1LabRequirements,
        Geology2: geology2LabRequirements,
        Physics: physicsLabRequirements
    };

    React.useEffect(() => {
        const newDegreePlanCourses: string[] = [];
        currentDegreePlan.semesters.forEach((semester) => {
            semester.classes.forEach((course) => {
                newDegreePlanCourses.push(course.courseCode);
            });
        });
        setDegreePlanCourses(newDegreePlanCourses);
    }, [currentDegreePlan]);

    const isClassInDegreePlan = (courseCode: string): boolean => {
        return degreePlanCourses.includes(courseCode);
    };

    const dropDown = (requirement: string[]) => {
        const coursesString = requirement.map((courseCode) => {
            const isInDegreePlan = isClassInDegreePlan(courseCode);
            return (
                <span
                    key={courseCode}
                    style={{
                        color: isInDegreePlan ? "green" : "black",
                        marginRight: "8px" // Adjust margin as needed
                    }}
                >
                    {courseCode}
                </span>
            );
        });

        return <div>{coursesString}</div>;
    };

    const handleLabChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLabTrack(e.target.value);
    };

    return (
        <div>
            <h2>Computer Science Degree Requirements</h2>
            <div>
                <h4>CIS Core Requirements:</h4>
                {dropDown(cisCoreRequirements)}
            </div>
            <div>
                <h4>Capstone Requirements: Pick one of the two.</h4>
                {dropDown(capstoneRequirements1)}
                {dropDown(capstoneRequirements2)}
            </div>
            <div>
                <h4>University Requirements:</h4>
                {dropDown(universityRequirements)}
            </div>
            <div>
                <h4>Writing Options:</h4>
                {dropDown(writingOptionRequirements)}
            </div>
            <div>
                <h4>Laboratory Science:</h4>
                <div>Please choose your science track.</div>
                <select onChange={handleLabChange} value={labTrack}>
                    <option value="Biology">Biology</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Geology1">Geology (Option 1)</option>
                    <option value="Geology2">Geology (Option 2)</option>
                    <option value="Physics">Physics</option>
                </select>
                {labTrack && labTrackRequirements[labTrack] && (
                    <div>
                        <h5>Lab Requirements for {labTrack}:</h5>
                        {dropDown(labTrackRequirements[labTrack])}
                    </div>
                )}
            </div>
            <div>
                <h4>Breadth Requirements:</h4>
                {Object.entries(breadthCredits).map(([breadth, credits]) => (
                    <div key={breadth}>
                        {breadth}: {credits} Credits
                        {credits < 3 && (
                            <span style={{ color: "red" }}> (Incomplete)</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComputerScienceRequirements;
