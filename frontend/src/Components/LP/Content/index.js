import React from "react";
import styles from "./Content.module.css";
import img4 from "../imgs/cdac_2.jpeg"
import img8 from "../imgs/pf_img8.avif"
import img9 from "../imgs/pf_img9.jpeg"

const index = ({ type, data }) => {
    const createMarkup = (content) => {
        return { __html: content };
    };

    switch (type) {
        case 1:
            return (
                <div className={styles["tab"]}>
                    <div className={styles["img"]}>
                        <img src={img4} />
                    </div>
                    <div className={styles["content"]}>
                        <p>
                            <h3 className={styles["keypoint"]}><u>What is Performance Management </u>?</h3>
                            <span className={styles["keypoint"]}>
                                It is a systematic process which
                                focuses on the effective management of individuals and
                                teams in order to achieve high levels of organizational
                                performance. It is a continuous process that involves
                                planning, developing, monitoring and rewarding to maximize
                                individual performance in order to improve organizational
                                effectiveness and accomplish the organization's mission and goals .

                            </span></p>
                    </div>
                </div>
            );
        case 2:
            return (
                <div className={styles["tab"]}>
                    <div className={styles["img"]}>
                        <img src={img9} />
                    </div>
                    <div className={styles["content"]}>
                        <p>
                            <h3 className={styles["keypoint"]}><u>Primary Objective of Performance Management </u></h3>
                            <span className={styles["keypoint"]}>
                                The primary objective of performance management is the
                                establishment of a culture in which individuals and groups
                                take responsibility for their own development and for the
                                development of others in an attempt to achieve maximum
                                levels of performance .
                            </span></p>
                            <br/>
                            <p>
                            <h3 className={styles["keypoint"]}><u>Main Focus of this Strategy</u></h3>
                            <span className={styles["keypoint"]}>
                                Effective performance management programs are rooted in a
                                strategy which focuses on the personal growth and development of individuals as well as the
                                development of teams within an organization. An effective program will also establish a
                                shared vision about what is to be collectively achieved at an individual and organization
                                level. This is accomplished by linking individual's objectives with the organization's mission
                                and strategic plans. This gives the individual a clear understanding on how he or she will
                                contribute to the achievement the organization's objectives and its overall success.
                            </span></p>
                    </div>
                    
                </div>
            );
        case 3:
            return (
                <div className={styles["tab"]}>
                    <div className={styles["img"]}>
                        <img src={img8} />
                    </div>
                    <div className={styles["content"]}>
                        <h2><u>KEY ELEMENTS OF PERFORMANCE MANAGEMENT</u></h2>
                        <ul>
                            <br />

                            <li className={styles["keypoint"]}><span><b>1. </b> Focusing on setting clear performance objectives</span></li>
                            <br />
                            <li className={styles["keypoint"]}><span><b>2. </b> Linking individual objectives to organizational objectives</span></li>
                            <br />
                            <li className={styles["keypoint"]}><span><b>3. </b>Implementing a on-going performance appraisal system process</span></li>
                            <br />
                            <li className={styles["keypoint"]}><span><b>4. </b>Creating clear individual development plans
                            </span></li>
                            <br />
                            <li className={styles["keypoint"]}><span><b>5. </b>Monitoring performance and individual development</span></li>
                            <br />
                            <li className={styles["keypoint"]}><span><b>6. </b>Providing feedback and assessment on performance</span></li>
                            <br />
                            <li className={styles["keypoint"]}><span><b>7. </b>Monitoring performance and individual developmen</span></li>
                            <br />
                            <li className={styles["keypoint"]}><span><b>8. </b>Conducting regular discussions throughout the performance cycle</span></li>
                            <br />
                            <li className={styles["keypoint"]}><span><b>9. </b>Implementing coaching and mentoring programs
                            </span></li>
                            <br />
                            <li className={styles["keypoint"]}><span><b>10. </b>Recognizing and rewarding high levels of performanc</span></li>
                            <br />
                        </ul>
                    </div>
                </div>
            );
    }
};

export default index;
