import React from "react";
import Chapter from "../../ui/Chapter/Chapter.js";
import { skillGroups, sources } from "../../../data/work.js";
import "./Skills.css";

// Every skill with the experience and projects that use it, as one table.
export default function Skills() {
    return (
        <Chapter
            id="skills"
            title={
                <>
                    What I build with, <em>and where</em>
                </>
            }
        >
            <table className="skills">
                <caption className="visually-hidden">Skills and where each one is used</caption>
                <thead className="skills__head">
                    <tr>
                        <th scope="col" className="label">Skill</th>
                        <th scope="col" className="label">Used in</th>
                        <th scope="col" className="label skills__count">Count</th>
                    </tr>
                </thead>
                {skillGroups.map((group) => (
                    <tbody key={group.name}>
                        <tr className="skills__group">
                            <th scope="rowgroup" colSpan={3} className="label">
                                {group.name}
                            </th>
                        </tr>
                        {group.skills.map((skill) => (
                            <tr className="skills__row" key={skill.name}>
                                <th scope="row" className="skills__name">{skill.name}</th>
                                <td className="skills__where data">
                                    {skill.usedIn.map((id) => sources[id]).join(", ")}
                                </td>
                                <td className="skills__count data">
                                    {skill.usedIn.length > 0 ? skill.usedIn.length : ""}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ))}
            </table>
        </Chapter>
    );
}
