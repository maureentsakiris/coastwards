<Dialog { ...restProps } className={ cls } actions={ [] } onEscKeyDown={ this._onCancelClick } onOverlayClick={ () => {} } >
				{ dialogDrop && <img src={ dialogDrop.file.preview } className={ style.image } /> }
				<div className={ style.inner } >
					<h3>Your image is ready for upload</h3>
					<p>{ formatMessage( messages.upload_drop_dialog_intro ) }</p>
					<div className={ style.form }>
						<Dropdown
							label={ formatMessage( messages.upload_drop_dialog_category ) }
							onChange={ this._handleChange.bind( this, 'category' ) }
							value={ category }
							source={ categories }
							template={ this._template }
						/>
						<Input 
							type="text" 
							label={ formatMessage( messages.upload_drop_dialog_comment_label ) } 
							value={ comment } 
							multiline={ true } 
							onChange={ this._handleChange.bind( this, 'comment' ) } 
						/>
					</div>
					<ProgressBar type="linear" mode="determinate" value={ progress } />
					<div className={ style.btns } >
						<Button className={ style.btn } label={ formatMessage( messages.upload_drop_dialog_upload_label ) } onClick={ this._onUploadClick }  raised accent />
						<Button className={ style.btn } label={ formatMessage( messages.upload_drop_dialog_cancel_label ) } onClick={ this._onCancelClick }  />
					</div>
				</div>
			</Dialog>