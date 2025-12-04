export class Logger {
    static info(message: string, data?: any) {
        const logMessage = `[INFO] ${message} ${data ? JSON.stringify(data) : ''}`
        cy.log(logMessage)
        console.log(logMessage)
    }

    static error(message: string, error?: any) {
        const logMessage = `[ERROR] ${message} ${error ? JSON.stringify(error) : ''}`
        cy.log(logMessage)
        console.error(logMessage)
    }
}
