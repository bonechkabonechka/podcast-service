import React from "react";
import {motion, AnimatePresence} from 'framer-motion'
import {featuresFirstVariants, featuresSecondVariants, pageFeaturesVariants} from '../constants/motionConstants'


export default function Features( {pageStep} ) {

    return (
        <motion.section className="features container"
        variants={pageFeaturesVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <motion.div className="features__box"
            variants={featuresFirstVariants}
            initial='hidden'
            animate='visible'
            transition={{duration: 0.3, ease: "easeInOut" }}
            >
                <AnimatePresence>
                    {pageStep >= 1 && (
                        <motion.div className="features__text"
                        variants={featuresSecondVariants}
                        initial='hidden'
                        animate='visible'
                        transition={{duration: 0.2, ease: "easeOut" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Voluptas eaque molestiae, fugit quasi, nisi, quidem sequi sint 
                            error impedit accusantium dicta quis minima odio quisquam ab 
                            enim reiciendis tempore itaque?                        
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.section>
    )
}