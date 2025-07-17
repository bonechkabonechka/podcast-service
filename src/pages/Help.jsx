import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    helpSecondVariants,
    helpFirstVariants,
    pageHelpVariants,
} from '../constants/motionConstants';

export default function Help({ pageStep }) {
    return (
        <motion.section
            className="help container"
            variants={pageHelpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <motion.div
                className="help__box"
                variants={helpFirstVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <AnimatePresence>
                    {pageStep >= 1 && (
                        <motion.div
                            className="help__text"
                            variants={helpSecondVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptas eaque molestiae, fugit quasi, nisi,
                            quidem sequi sint error impedit accusantium dicta
                            quis minima odio quisquam ab enim reiciendis tempore
                            itaque?
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.section>
    );
}
