export const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: '90vw',
    height: '90vh',
    overflow: 'auto',
    background: 'var(--crema)',
}
export const styleBlocks = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
}
export const styleBlock = {
    textAlign: 'center',
    flex: '1 1 25rem',
    position: 'relative',
}
export const styleDivModal = {
    marginBottom: '0.5rem',
}
export const styleDivDoubleModal = {
    display: 'inline-block',
    width: '50%',
}
export const styleLabelModal = {
    display: 'block',
    textAlign: 'left',
}
export const styleLoadingValidateSku = {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '3rem',
}
export const styleLoadingSaveEditSku = scrolltopcontentmodal => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    background: 'rgba(0,0,0,.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scrolltopcontentmodal,
})
export const styleLoadingSaveEditSkuMessage = {
    fontSize: '1.6rem',
    background: '#fff',
    borderRadius: '0.3rem',
    padding: '0.6rem',
}
export const styleMessageResponseSaveEditSku = saveeditsuccess => ({
    color: saveeditsuccess ? 'var(--verdea)' : 'var(--rojoa)',
    fontSize: '1.6rem',
    textTransform: 'capitalize',
    textAlign: 'center',
    background: 'rgba(0, 0, 0, .2)',
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '2.5rem',
    width: '100%',
})
export const styleImage = {
    maxHeight: '18rem',
    maxWidth: '100%',
    height: '18rem',
    width: '100%',
    objectFit: 'contain',
}
export const styleContentButtons = {
    textAlign: 'center',
    marginTop: '0.8rem',
}