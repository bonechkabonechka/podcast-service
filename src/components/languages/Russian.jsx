import React from "react";
import { motion, AnimatePresence} from 'framer-motion'
import Podcasts from "../../pages/podcasts/Podcasts";

export default function Russian() {
    return (
        <motion.div className="russian wrapper">
            <Podcasts/>
        </motion.div>
    )
}