import React, { useRef } from 'react'
import { IxButton, IxIconButton, Modal } from '@siemens/ix-react'
const CustomModal = ({ title, children, handleSubmit }) => {
	const modalRef = useRef(null)

	const close = () => {
		modalRef.current?.close('close payload!')
	}
	const dismiss = () => {
		modalRef.current?.dismiss('dismiss payload')
	}
	return (
		<Modal ref={modalRef}>
			<div className='modal-header'>
				{title}
				<IxIconButton
					data-button-close
					ghost
					icon='close'
					onClick={() => dismiss()}
				></IxIconButton>
			</div>
			<div className='modal-body'>{children}</div>
			<div className='modal-footer'>
				<IxButton outline onClick={() => dismiss()}>
					Cancel
				</IxButton>
				<IxButton
					onClick={() => {
						handleSubmit()
						close()
					}}
				>
					OK
				</IxButton>
			</div>
		</Modal>
	)
}

export default CustomModal
