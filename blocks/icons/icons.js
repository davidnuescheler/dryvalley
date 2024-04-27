export default async function decorate(block) {
    const classes = ['icon', 'body'];
    [...block.children].forEach((row) => {
        [...row.children].forEach((cell, i) => {
            cell.className = `icons-${classes[i]}`;
        });
    })
}