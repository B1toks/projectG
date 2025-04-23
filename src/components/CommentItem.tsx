import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'; 

interface CommentProps {
  name: string;
  avatarUrl: string;
  content: string;
}

const CommentItem: React.FC<CommentProps> = ({ name, avatarUrl, content }) => {
  return (
    <div className="flex items-start gap-4">
      <Avatar>
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-semibold">{name}</div>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
