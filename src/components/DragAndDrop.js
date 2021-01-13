import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

// https://react-dropzone.js.org/

const thumbsContainer = {
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	marginTop: 16,
};

const thumb = {
	display: "inline-flex",
	borderRadius: 2,
	border: "1px solid #eaeaea",
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: "border-box",
};

const thumbInner = {
	display: "flex",
	minWidth: 0,
	overflow: "hidden",
};

const img = {
	display: "block",
	width: "auto",
	height: "100%",
};

const styleContainer = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "20px",
	borderWidth: "2px",
	borderRadius: "2px",
	borderColor: "var(--darkOrange)",
	borderStyle: "dashed",
	backgroundColor: "#fafafa",
	color: "#bdbdbd",
	outline: "none",
	transition: "border .24s ease-in-out",
	cursor: "pointer",
};

function Previews(props) {
	const [files, setFiles] = useState([]);
	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/*",
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});

	const removeFile = (file) => () => {
		const newFiles = [...files];
		newFiles.splice(newFiles.indexOf(file), 1);
		setFiles(newFiles);
	};

	const thumbs = files.map((file) => (
		<div className="drag-drop-duo">
			<div style={thumb} key={file.name}>
				<div style={thumbInner}>
					<img src={file.preview} style={img} alt="for upload" />
				</div>
			</div>
			<button className="drag-drop-button" onClick={removeFile(file)}>
				USUŃ
			</button>
		</div>
	));

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

	console.log("files", files);

	return (
		<section className="container" style={styleContainer}>
			<div {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<p>Przeciągnij i upuść tutaj pliki lub kliknij, aby wybrać</p>
			</div>
			<aside style={thumbsContainer}>{thumbs}</aside>
		</section>
	);
}

export default Previews;
