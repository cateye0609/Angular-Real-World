import { Article } from './article.model';
import { Profile } from './profile.model';
import { User } from './user.model';

export interface UserResponse {
    user: User;
}

export interface ProfileResponse {
    profile: Profile;
}

export interface ArticleResponse {
    article: Article;
}

export interface ArticleListResponse {
    articles: Article[];
}