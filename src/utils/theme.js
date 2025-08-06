export const initThemeToggle = () => {
    const theme = document.querySelectorAll('.theme')

    const toggleTheme = (clickedBtn) => {
        document.body.classList.toggle('dark')

        theme.forEach((btn) => {
            if (btn === clickedBtn) {
                btn.classList.remove('active')
            } else {
                btn.classList.add('active')
            }
        })
    }

    theme.forEach((btn) => {
        btn.addEventListener('click', () => toggleTheme(btn))
    })
}
