import { FunctionComponent, HTMLInputTypeAttribute, ReactNode } from 'react';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { IconType } from 'react-icons';

type FieldSchema = {
	type: 'text' | 'number' | 'array' | 'object' | 'pin';
};

type DefaultProps = {
	label: string;
	placeholder?: string;
	helperText?: string;
	LabelIcon?: IconType;
};

export type TextFieldProps = FieldSchema &
	DefaultProps & {
		type: 'text';
		htmlType?: HTMLInputTypeAttribute;
	};

export type NumberFieldProps = FieldSchema &
	DefaultProps & {
		type: 'number';
		min?: number;
		max?: number;
	};

export type ObjectFieldProps = FieldSchema &
	DefaultProps & {
		type: 'object';
		properties: Fields;
		styling?: {
			fieldsPerColumn?: number;
		};
	};

export type ArrayFieldProps = FieldSchema &
	DefaultProps & {
		type: 'array';
		itemField: Field;
	};

export type PinFieldProps = FieldSchema &
	DefaultProps & {
		type: 'pin';
	};

export type Field =
	| TextFieldProps
	| NumberFieldProps
	| ObjectFieldProps
	| ArrayFieldProps
	| PinFieldProps;

type Fields = Record<string, Field>;

export interface FormProps {
	fields: Fields;
	onSubmit: SubmitHandler<FieldValues>;
	styling?: {
		fieldsPerColumn?: number;
		formWidth?: string;
	};
	submitText?: string;
	formTitle?: string;
	SubmitInfo?: ReactNode;
	Container?: FunctionComponent<{ children: ReactNode }>;
	multistep?: { previousStep?: () => void };
	isLoading?: boolean;
	isDisabled?: boolean;
}
