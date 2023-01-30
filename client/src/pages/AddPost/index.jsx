import React, { useMemo, useCallback, useState, useRef } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from '../../api';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
	const [valueMDE, setValueMDE] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const isAuth = useSelector((state) => state.auth.isAuth);
	const inputFileRef = useRef(null);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
	});

	const handleChangePreviewFile = async (e) => {
		try {
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append('file', file);
			const { data } = await axios.post('file/upload-preview', formData);
			setImageUrl(data.url);
		} catch (error) {
			console.log(error);
		}
	};

	const onClickRemovePreview = async () => {
		try {
			const { data } = await axios.post('file/delete', {
				url: imageUrl,
				folder: 'previews',
			});
			setImageUrl('');
		} catch (error) {
			console.log(error);
		}
	};

	const onChangeSimpleMDE = useCallback((value) => {
		setValueMDE(value);
	}, []);

	const onPostSubmit = async (postData) => {
		try {
			const { data } = await axios.post('/articles', {
				...postData,
				imageUrl,
				text: valueMDE,
			});

			const id = data._id;
			navigate(`/posts/${id}`);
		} catch (error) {
			console.log(error);
		}
	};

	const options = useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Enter a text...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	);

	if (!isAuth && !localStorage.getItem('token')) {
		return <Navigate to="/" />;
	}

	return (
		<Paper style={{ padding: 30 }}>
			<div>
				<Button
					onClick={() => inputFileRef.current.click()}
					className={styles.upload}
					variant="outlined"
					size="large"
				>
					Load Preview
				</Button>
				<input
					ref={inputFileRef}
					type="file"
					onChange={handleChangePreviewFile}
					hidden
				/>
				{imageUrl && (
					<Button
						variant="contained"
						color="error"
						onClick={onClickRemovePreview}
					>
						Delete
					</Button>
				)}
			</div>

			{imageUrl && (
				<img
					className={styles.image}
					src={`${process.env.REACT_APP_API_URL}/previews/${imageUrl}`}
					alt="Uploaded"
				/>
			)}

			<form onSubmit={handleSubmit(onPostSubmit)} className={styles.form}>
				<TextField
					classes={{ root: styles.title }}
					variant="standard"
					placeholder="Title..."
					fullWidth
					{...register('title', {
						required: 'Please enter a title',
						minLength: {
							value: 5,
							message: 'Title must have more than 4 characters',
						},
					})}
				/>
				{!!errors.title?.message && (
					<p className={styles.error}>{errors.title?.message}</p>
				)}
				<TextField
					classes={{ root: styles.tags }}
					variant="standard"
					placeholder="Tags (separated by commas)"
					fullWidth
					{...register('tags', {
						required: 'Please enter minimum 1 tag',
					})}
				/>
				{!!errors.tags?.message && (
					<p className={styles.error}>{errors.tags?.message}</p>
				)}
				<SimpleMDE
					className={styles.editor}
					value={valueMDE}
					onChange={onChangeSimpleMDE}
					options={options}
				/>
				{!!errors.text?.message && (
					<p className={styles.error}>{errors.text?.message}</p>
				)}

				<div className={styles.buttons}>
					<Button type="submit" size="large" variant="contained">
						Publish
					</Button>
					<Link to="/">
						<Button size="large">Cancel</Button>
					</Link>
				</div>
			</form>
		</Paper>
	);
};
