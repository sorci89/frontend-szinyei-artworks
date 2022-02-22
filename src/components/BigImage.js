import React from 'react';
import './bigImage.scss';

import Button from './Button';

const BigImage = ({ data, setIsOpen }) => {
  let dateYMD = data.lastupdate.slice(0, 10);

  return (
    <div className='bigImage_container'>
      <div className='head'>
        <div className='h2'>
          {data.people &&
          data.people[0] &&
          data.people[0].displayname &&
          data.title ? (
            <>
              <div className='bigImage_artist'>
                {data.people[0].displayname}:
              </div>
              {data.title}
            </>
          ) : data.title ? (
            <div bigImage_artist>Unknown artist: {data.title} </div>
          ) : null}
        </div>
        <div className='button_container'>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            text='Close'
          />
        </div>
      </div>

      <div className='inside_image'>
        <img
          src={
            data.images && data.images[0] && data.images[0].baseimageurl
              ? data.images[0].baseimageurl
              : data.images
              ? '/pictures/bg-paper-texture-2.jpg'
              : '/pictures/no-profile-picture.png'
          }
          alt='not available'
        />
        {data.people && data.people[0].displayname && data.title && (
          <div className='title'>
            {data.people[0].displayname}: <br />
            {data.title}
          </div>
        )}

        <div className='details'>
          {data.classification ? (
            <div>
              <span>Classification: </span> {data.classification}
            </div>
          ) : (
            <div className='unknown'>
              <span>Classification: </span> unknown
            </div>
          )}
          {data.century ? (
            <div>
              <span>Century: </span> {data.century}
            </div>
          ) : (
            <div className='unknown'>
              <span>Century: </span> unknown
            </div>
          )}
          {data.culture ? (
            <div>
              <span>Culture: </span> {data.culture}
            </div>
          ) : (
            <div className='unknown'>
              <span>Culture: </span> unknown
            </div>
          )}
          {data.dated ? (
            <div>
              <span>Dated: </span> {data.dated}
            </div>
          ) : (
            <div className='unknown'>
              <span>Dated: </span> unknown
            </div>
          )}
          {data.department ? (
            <div>
              <span>Department: </span> {data.department}
            </div>
          ) : (
            <div className='unknown'>
              <span>Department: </span> no data
            </div>
          )}
          {data.dimensions ? (
            <div>
              <span>Dimensions:</span> <br />
              {data.dimensions}
            </div>
          ) : (
            <div className='unknown'>
              <span>Dimensions: </span> no data
            </div>
          )}
          {data.division ? (
            <div>
              <span>Division: </span>
              {data.division}
            </div>
          ) : (
            <div className='unknown'>
              <span>Division: </span> no data
            </div>
          )}
          {data.medium ? (
            <div>
              <span>Technique: </span>
              {data.medium}
            </div>
          ) : (
            <div className='unknown'>
              <span>Technique: </span>
              no data
            </div>
          )}
          {data.period ? (
            <div>
              <span>Artistic period: </span>
              {data.period}
            </div>
          ) : (
            <div className='unknown'>
              <span>Artistic period: </span>
              unknown
            </div>
          )}
          {data.worktypes && data.worktypes[0] ? (
            <div>
              <span>Worktype: </span>
              {data.worktypes[0].worktype}
            </div>
          ) : (
            <div className='unknown'>
              <span>Worktype: </span>
              unknown
            </div>
          )}
        </div>
      </div>
      {data.images && data.images[0] && data.images[0].description ? (
        <div className='description'>{data.images[0].description}</div>
      ) : (
        <div className='unknown description'>
          Desciption is not yet part of the museum API
        </div>
      )}
      <div className='details'>
        {data.classification ? (
          <div>
            <span>Classification: </span> {data.classification}
          </div>
        ) : (
          <div className='unknown'>
            <span>Classification: </span> unknown
          </div>
        )}
        {data.century ? (
          <div>
            <span>Century: </span> {data.century}
          </div>
        ) : (
          <div className='unknown'>
            <span>Century: </span> unknown
          </div>
        )}
        {data.culture ? (
          <div>
            <span>Culture: </span> {data.culture}
          </div>
        ) : (
          <div className='unknown'>
            <span>Culture: </span> unknown
          </div>
        )}
        {data.dated ? (
          <div>
            <span>Dated: </span> {data.dated}
          </div>
        ) : (
          <div className='unknown'>
            <span>Dated: </span> unknown
          </div>
        )}
        {data.department ? (
          <div>
            <span>Department: </span> {data.department}
          </div>
        ) : null}
        {data.dimensions ? (
          <div>
            <span>Dimensions: </span> {data.dimensions}
          </div>
        ) : (
          <div className='unknown'>
            <span>Dimensions: </span> no data
          </div>
        )}
        {data.division ? (
          <div>
            <span>Division: </span>
            {data.division}
          </div>
        ) : (
          <div className='unknown'>
            <span>Division: </span> no data
          </div>
        )}
        {data.medium ? (
          <div>
            <span>Technique: </span>
            {data.medium}
          </div>
        ) : (
          <div className='unknown'>
            <span>Technique: </span>
            no data
          </div>
        )}
        {data.period ? (
          <div>
            <span>Artistic period: </span>
            {data.period}
          </div>
        ) : (
          <div className='unknown'>
            <span>Artistic period: </span>
            unknown
          </div>
        )}
        {data.contact ? (
          <div>
            <span>Contact: {data.contact}</span>
          </div>
        ) : null}
        {data.worktypes && data.worktypes[0].worktype ? (
          <div>
            <span>Worktype: </span>
            {data.worktypes[0].worktype}
          </div>
        ) : (
          <div className='unknown'>
            <span>Worktype: </span>
            unknown
          </div>
        )}
      </div>
      {data.lastupdate ? (
        <div className='lastupdate'>
          <b>Last update:</b>
          {dateYMD}
        </div>
      ) : (
        <div className='lastupdate'>Last update: no data</div>
      )}
    </div>
  );
};

export default BigImage;
