import styles from './AppCard.module.scss'
export const AppCard: React.FC<AppCardProps> = ({ children }) => {
    return (
    <div className={styles.cardOuter}>
        {children}
    </div>
    )
}

export interface AppCardProps {
    children: React.ReactNode; 
}