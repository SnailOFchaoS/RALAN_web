import { YouWillFindInfoBlockProps } from "@/components/Common/types";

export interface YouWillFindInfoProps {
	infoBlockContent: YouWillFindInfoBlockProps;
	openedBlocks: number[];
	index: number;
	setChangedColorBlocks: (data: number[]) => void;
	changedColorBlocks: number[];
}

