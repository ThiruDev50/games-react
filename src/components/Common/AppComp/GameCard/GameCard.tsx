import { AppCard } from "../../AppCard/AppCard"
import styles from './GameCard.module.scss'
export const GameCard: React.FC<GameCardProps> = ({ label }) => {
    return (<div className={styles.gameCardOuter}>
        <AppCard >
            <div className={styles.gameCardInner}>
                {label}
            </div>
        </AppCard>
    </div>)
}

export interface GameCardProps {
    label : string
}